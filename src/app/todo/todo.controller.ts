import { NotFoundException } from '@nestjs/common';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService){}

  @Get()
  async findAll(){
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string){
    const todo = await this.todoService.findOne(id);
    if(!todo)
      throw new NotFoundException();
    return todo
  }

  @Post()
  async create(@Body() body){
    return await this.todoService.create(body);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body){  
    const todo = await this.todoService.findOne(id);
    if(!todo)
      throw new NotFoundException();
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string){
    return await this.todoService.delete(id);
  }
}
