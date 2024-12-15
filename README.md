To start app, run
`yarn start:dev`

### Nest CLI
Create module, run
`nest g module [module_name]`

Create service CLI
`nest j service [service_name] --no-spec`

### Docker CLI
Run `docker compose up [db-name] -d`

`docker compose rm [db-name] -s -f -v`
- `rm`: remove stopped container associated with services defined in the `docker-compose.yml` file
- `-s` or `--stop`: stops the container if it's still running
- `-f` or `--force`: force the removal w/o asking for confirmation
- `-v` or `--volumes`: removes any volumes associated with the container, ensuring that both the container and its data are deleted


## Prisma CLI
Init prisma
`npx prisma init`

`npx prisma migrate dev`

`npx prisma generate`

`npx prisma studio`

### Controllers
*Responsible for handling incoming **request** and returning **responses** to the client*

