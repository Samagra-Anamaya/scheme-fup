import { ApiProperty } from '@nestjs/swagger';
import { JsonObject } from '@prisma/client/runtime/library';
import {
  IsNumber,
  IsOptional
} from 'class-validator';

export class AuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}


export class SchemeMetadata {
  @ApiProperty({
    examples: ['CULC8', 'SCH10'],
    description: 'Scheme code (any defined format)',
  })
  @IsOptional()
  schemeCode: string;
  
  @ApiProperty({
    description: 'Name of the scheme',
    example: 'Farm Mech DBT'
  })
  @IsOptional()
  schemeName: string;
  
  @ApiProperty({
    description: 'Name of the department'
  })
  @IsOptional()
  department: string;
  
  @ApiProperty({
    description: 'Name of the domain',
    example: 'Agriculture'
  })
  @IsOptional()
  domain: string;
  
  @ApiProperty({
    description: 'Type of person/group facilitating the scheme',
    example: 'Krushak Sathi'
  })
  @IsOptional()
  facilitatortype: string;
  
  @ApiProperty({
    description: 'Financial year in YYYY-YY format',
    example: '2022-23'
  })
  @IsOptional()
  financialYear: string;
  
  @ApiProperty({
    description: 'Location',
    example: {
      type: 'district',
      name: 'Mumbai'
    }
  })
  @IsOptional()
  geolocation: JsonObject;
}

export class Application{
  @ApiProperty({
    description: 'Cost of the project for which application is given',
    example: 50000
  })
  @IsNumber()
  @IsOptional()
  projectCost: number;
  
  @ApiProperty({
    description: 'Application ID for all SUGAM schemes',
    example: 'APC/00374044'
  })
  @IsOptional()
  applicationID: string;
  
  @ApiProperty({
    description: 'Name of the group which has applied for a scheme',
    example: 'JAY JAGANNATH JLG'
  })
  @IsOptional()
  groupName: string;
  
  @ApiProperty({
    description: 'Name of person applying on behalf of group',
    example: 'PRASANTA KUMAR PRADHAN (RG23KS00002149)'
  })
  @IsOptional()
  facilitatorname: string;
  
  @ApiProperty({
    description: 'Amount sanctioned for the scheme',
    example: '5000'
  })
  @IsOptional()
  amountSanctioned: number;
  
  @ApiProperty({
    description: 'Type of commodity involved',
    example: 'Crop: CropName. Pesticide: PesticideName'
  })
  @IsOptional()
  commodityType: string;
  
  @ApiProperty({
    description: 'Variety of commodity',
    examples: ['high yield  ', 'low yield']
  })
  @IsOptional()
  commodityVariety: string;
}

export class Applicant {
  @ApiProperty({
    description: '13 Digit Aadhaar Reference Number',
    example: '1234123412345'
  })
  @IsOptional()
  aadhaarReferenceNumber: string;
  
  @ApiProperty({
    description: 'Name of the Beneficiary',
    example: 'PRASANTA KUMAR PRADHAN'
  })
  @IsOptional()
  beneficiaryName: string;
  
  @ApiProperty({
    description: 'Aadhar Number',
    example: '123412341234'
  })
  @IsOptional()
  uniqueBeneficiaryID: string;
  
  @ApiProperty({
    description: 'beneficiaries are mapped to clusters for a scheme (RFM)',
    example: 'BALA_PUIN_000001'
  })
  @IsOptional()
  clusterID: string;
}

export class Transaction {
  @ApiProperty({
    description: 'Type of transaction',
    examples: ['Cash', 'Kind']
  })
  @IsOptional()
  transactionType: string;
  
  @ApiProperty({
    description: 'Transaction Amount can display the cash amount received',
    example: 5000
  })
  @IsOptional()
  transactionAmount: number;
  
  @ApiProperty({
    description: ' Quantity of kind received',
    example: 4000
  })
  @IsOptional()
  transactionQuantity: number;
  
  @ApiProperty({
    description: 'Anyting other than Cash',
    examples: ['Tractor', '...']
  })
  @IsOptional()
  transactionCommodity: string;
  
  @ApiProperty({
    description: 'Unit of transaction',
    examples: ['Kg', 'Rs']
  })
  @IsOptional()
  transactionUnit: string;
  
  @ApiProperty({
    description: 'Subsidy percentage',
    example: ''
  })
  @IsOptional()
  transactionPercentage: string;
  
  @ApiProperty({
    description: 'Transaction date in DD-MM-YYYY format',
    example: '05-06-2024'
  })
  @IsOptional()
  transactionDate: string;
  
  @ApiProperty({
    description: '',
    examples: ['Subsidy 1', 'Subsidy 2', 'Subsidy 3']
  })
  @IsOptional()
  transactionNumber: string;
}

export class Scheme {
  @ApiProperty({
    description: 'Information about scheme'
  })
  schemeMetadata: SchemeMetadata;
  
  @ApiProperty({
    description: 'Application Information'
  })
  application: Application;
  
  @ApiProperty({
    description: 'Applicant Information'
  })
  applicant: Applicant;
  
  @ApiProperty({
    description: 'Benefit detail'
  })
  transaction: Transaction
  
  @ApiProperty({
    description: 'Any remarks about scheme transaction'
  })
  remarks: String
}

export class SchemeTransactionEventDto {
  @ApiProperty({
    type: [Scheme],
  })
  data: Scheme[];
}
