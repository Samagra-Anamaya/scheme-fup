import { BadRequestException, Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SchemeService } from './scheme.service';
import { AuthDto, SchemeTransactionEventDto } from './dto/scheme.transaction.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiProduces, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { AuthGuard } from './auth.guard';

class ResponseType {
  @ApiProperty({
    example: false
  })
  error: boolean;

  @ApiProperty({
    example: '5 scheme transactions saved successfully'
  })
  message: string = `5 scheme transactions saved successfully`;
}

@UseGuards(AuthGuard)
@Controller('scheme')
export class SchemeController {
    constructor(private readonly schemeService: SchemeService) {}

    @Public()
    @Post('/authenticate')
    async authenticate(@Body() authDto: AuthDto) {
      return await this.schemeService.authenticate(
        authDto.username,
        authDto.password,
      );
    }

    @ApiBody({
      type: SchemeTransactionEventDto
    })
    @ApiOperation({
      summary: 'Save list of scheme transaction events',
      description: 'This API expects list of scheme transaction events, and validated their schema through class validator and saves valid schems to database.'
    })
    @ApiOkResponse({
      status: 200,
      type: ResponseType,
    })
    @ApiBearerAuth()
    @Post('/saveSchemeTransaction')
    async saveSchemeTransaction(
      @Body() schemeTransactionDetail: SchemeTransactionEventDto,
      @Req() request: Request,
    ) {
      const userIdHeader = (request.headers as any).userId;
        const userId: string = Array.isArray(userIdHeader)
          ? userIdHeader[0]
          : userIdHeader;
      console.log(userId)
      return await this.schemeService.saveSchemeTransaction(
        schemeTransactionDetail.data,
        userId
      );
    }

    @ApiQuery({
      name: 'page',
      type: Number
    })
    @ApiQuery({
      name: 'limit',
      type: Number
    })
    @ApiBearerAuth()
    @ApiOperation({
      summary: 'Fetch saved list of scheme transaction events',
      description: 'This API expects page and limit query and return list of transaction for authenticated userz.'
    })
    @Get('/savedSchemeTransactions')
    async getSavedSchemeTransactions(
      @Query('page') page: string,
      @Query('limit') limit: string,
      @Req() request: Request,
    ) {
      const userIdHeader = (request.headers as any).userId;
      const userId: string = Array.isArray(userIdHeader)
        ? userIdHeader[0]
        : userIdHeader;
  
      const validatedPage = Number(page) || 1;
      const validatedLimit = Number(limit) || 10;
  
      if (isNaN(validatedPage) || isNaN(validatedLimit)) {
        throw new BadRequestException('Invalid input parameters');
      }
      return await this.schemeService.getSavedSchemeTransactions(
        validatedPage,
        validatedLimit,
        userId,
      );
    }
}
