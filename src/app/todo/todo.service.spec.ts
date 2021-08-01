import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindRelationsNotFoundError, Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { TodoService } from './todo.service';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({id: '1', task: 'task-one'}),
  new TodoEntity({id: '2', task: 'task-two'}),
  new TodoEntity({id: '3', task: 'task-three'})
]

describe('TodoService', () => {
  let sut: TodoService;
  let todoRepository: Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      TodoService,
      {
        provide: getRepositoryToken(TodoEntity),
        useValue: {
          find: jest.fn().mockResolvedValue(todoEntityList),
          findOne: jest.fn(),
          save: jest.fn(),
          create: jest.fn(),
          merge: jest.fn(),
          delete: jest.fn(),
        }
      }
    ],
    }).compile();

    sut = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(getRepositoryToken(TodoEntity));
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    test('should return a todo list of TodoEntity', async () => {
      const result = await sut.findAll();
      expect(result).toEqual(todoEntityList);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });
    test('should throw an exception', () => {
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());
      expect(sut.findAll()).rejects.toThrowError();
    });  

  })
});
