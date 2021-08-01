import { NotFoundException } from '@nestjs/common';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from '../dto/todo-create.dto';
import { UpdateTodoDto } from '../dto/todo-upadate.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService){}

  @Get()
  @ApiOperation({summary: 'Listar todos os dados das tarefas'})
  @ApiResponse({status: 200, description: 'Lista de tarefas', type: TodoEntity, isArray: true})
  async findAll(){
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Listar uma tarefa'})
  @ApiResponse({status: 200, description: 'Lista uma tarefa', type: TodoEntity})
  @ApiResponse({status: 400, description: 'Parametros invalidos'})
  async findOne(@Param('id', new ParseUUIDPipe()) id: string){
    const todo = await this.todoService.findOne(id);
    if(!todo)
      throw new NotFoundException();
    return todo
  }

  @Post()
  @ApiOperation({summary: 'Cria uma tarefa'})
  @ApiResponse({status: 201, description: 'Tarefa criada com sucesso', type: TodoEntity})
  async create(@Body() body: CreateTodoDto){
    return await this.todoService.create(body);
  }

  @Put(':id')
  @ApiOperation({summary: 'Atualiza uma tarefa'})
  @ApiResponse({status: 200, description: 'Tarefa atualizada', type: TodoEntity})
  @ApiResponse({status: 400, description: 'Parametros invalidos'})
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto){  
    const todo = await this.todoService.findOne(id);
    if(!todo)
      throw new NotFoundException();
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Exclui uma tarefa'})
  @ApiResponse({status: 204, description: 'Tarefa exluida'})
  @ApiResponse({status: 400, description: 'Parametros invalidos'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string){
    return await this.todoService.delete(id);
  }
}
