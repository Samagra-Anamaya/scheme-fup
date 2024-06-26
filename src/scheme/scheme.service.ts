import { Injectable } from '@nestjs/common';
import { Scheme } from './dto/scheme.transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { scheme_transaction } from '@prisma/client';


@Injectable()
export class SchemeService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    private userServiceBaseUrl = process.env.USER_SERVICE;
    private appId = process.env.APPLICATION_ID;

    async authenticate(username: string, password: string) {
        let response;
        try {
            response = await axios.post(`${this.userServiceBaseUrl}/api/login`, {
                password: password,
                loginId: username,
                applicationId: this.appId,
            });
            if (response.data.responseCode === 'FAILURE') {
                console.log(response.data)
                return {
                    status: 'failure',
                    message: response.data.params.err,
                };
            }
            const token = response.data.result.data.user.token;
            return {
                status: 'success',
                message: 'Authenticated',
                token: token,
            };
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async saveSchemeTransaction(schemetransactions: Scheme[], userId: string) {
        const flattenSchemeTransaction = schemetransactions.map((data) => {
            const res = {
                ...data.applicant,
                ...data.application,
                ...data.schemeMetadata,
                ...data.transaction,
            }
            res['remarks'] = data.remarks;
            res['userId'] = userId;
            return res;
        })
        console.log(flattenSchemeTransaction)
        try {
            await this.prismaService.scheme_transaction.createMany({
                data: flattenSchemeTransaction
            });
        } catch (err) {
            console.log(err)
            return {
                error: true,
                message: err
            }
        }
        return {
            error: false,
            message: `${schemetransactions.length} scheme transactions saved successfully`
        }
    }

    async getSavedSchemeTransactions(
        page: number,
        pageSize: number,
        userId: string,
    ) {
        const skip = (page - 1) * pageSize;
        const [savedTransactions, total] = await Promise.all([
            this.prismaService.scheme_transaction.findMany({
                where: {
                    userId: userId,
                },
                skip,
                take: pageSize,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prismaService.scheme_transaction.count({
                where: {
                    userId: userId,
                },
            }),
        ]);
        const res = savedTransactions.map((transaction) => {
            return {
                schemeMetadata: {
                    schemeCode: transaction.schemeCode,
                    schemeName: transaction.schemeName,
                    department: transaction.department,
                    domain: transaction.domain,
                    facilitatortype: transaction.facilitatortype,
                    financialYear: transaction.financialYear,
                    geolocation: transaction.geolocation
                },
                application: {
                    projectCost: transaction.projectCost,
                    applicationId: transaction.applicationID,
                    groupName: transaction.groupName,
                    facilitatorname: transaction.facilitatorname,
                    amountSanctioned: transaction.amountSanctioned,
                    commodityType: transaction.commodityType,
                    commodityVariety: transaction.commodityVariety
                },
                applicant: {
                    aadhaarReferenceNumber: transaction.aadhaarReferenceNumber,
                    beneficiaryName: transaction.beneficiaryName,
                    uniqueBeneficiaryId: transaction.uniqueBeneficiaryID,
                    clusterId: transaction.clusterID
                },
                transaction: {
                    transactionType: transaction.transactionType,
                    transactionAmount: transaction.transactionAmount,
                    transactionQuantity: transaction.transactionQuantity,
                    transactionCommodity: transaction.transactionCommodity,
                    transactionUnit: transaction.transactionUnit,
                    transactionPercentage: transaction.transactionPercentage,
                    transactionDate: transaction.transactionDate,
                    transactionNumber: transaction.transactionNumber
                },
                remarks: transaction.remarks
            }
        })
        return {
            savedSchemes: res,
            totalCount: total,
            currentPage: page,
            totalPages: Math.ceil(total / pageSize),
        };
    }
}
