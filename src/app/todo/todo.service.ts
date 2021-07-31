import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    async create(data){
      return await this.todoRepository.save(this.todoRepository.create(data));
    }

    async update(id: string, data){
      const todo = await this.findOne(id);
      this.todoRepository.merge(todo, data)
      return await this.todoRepository.save(todo);
    }

    async delete(id: string){
      const todo = await this.findOne(id);
      return await this.todoRepository.softDelete(todo);
    }
}
