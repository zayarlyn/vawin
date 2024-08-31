// import { BillModel } from '@db/sequelize/model';
import { Query, Resolver } from '@nestjs/graphql'
// import { InjectModel } from '@nestjs/sequelize';
// import { WhereOptions } from 'sequelize';
import { ProductType } from '../type'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '@db/entities'
import { Repository } from 'typeorm'
// import { IsNotEmptyObject, IsOptional, IsString } from 'class-validator';
// import { Type } from 'class-transformer';
// import { GraphQLJSON } from 'graphql-scalars';

// FIXME: id = 1 is a mysql curse

// // @InputType()
// class Where {
//   @Field({ nullable: true })
//   @IsOptional()
//   @IsString()
//   id?: string;
// }

// @ArgsType()
// class BillListArgs {
//   @Field(() => GraphQLJSON, { nullable: true })
//   @IsNotEmptyObject()
//   @Type(() => Where)
//   where?: WhereOptions<any>;
// }

@Resolver()
export class ProductListQueryResolver {
  constructor(
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  @Query(() => [ProductType])
  // async billList(@Args() args: BillListArgs): Promise<BillType[]> {
  async productList(): Promise<ProductType[]> {
    // const { where } = args;

    return this.product.find()
    // return this.billModel.findAll({ where });
    return
  }
}
