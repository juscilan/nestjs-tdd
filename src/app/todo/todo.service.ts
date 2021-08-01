import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/todo-create.dto';
import { UpdateTodoDto } from '../dto/todo-upadate.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) 
    private readonly todoRepository: Repository<TodoEntity>) {}

    async findAll(){
      return await this.todoRepository.find();
    }

    async findOne(id: string){
      return await this.todoRepository.findOne(id);
    }

    async create(data: CreateTodoDto){
      return await this.todoRepository.save(this.todoRepository.create(data));
    }

    async update(id: string, data: UpdateTodoDto){
      const todo = await this.findOne(id);
      if(!todo)
        return null
      this.todoRepository.merge(todo, data)
      return await this.todoRepository.save(todo);
    }

    async delete(id: string){
      return await this.todoRepository.delete(id);
    }
}
