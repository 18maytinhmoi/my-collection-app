import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiException {
  @ApiProperty() statusCode: number;
  @ApiProperty() status: string;
  @ApiProperty() message: string;
  @ApiProperty() timestamp: string;
  @ApiPropertyOptional() error?: string;
  @ApiPropertyOptional() errors?: unknown;
  @ApiPropertyOptional() path?: string;

  constructor(exception: {
    statusCode: number;
    message: string;
    error: string;
    errors?: unknown;
    path?: string;
  }) {
    this.statusCode = exception.statusCode;
    this.status = HttpStatus[exception.statusCode];
    this.message = exception.message;
    this.error = exception.error;
    this.errors = exception.errors;
    this.timestamp = new Date().toISOString();
    this.path = exception.path;
  }
}
