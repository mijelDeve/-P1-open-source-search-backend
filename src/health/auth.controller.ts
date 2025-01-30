import { Controller, Get, Request, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {

    @Get('')
    async healthCheck() {
        return {
            message: 'Health check passed'
        };
    }

    @Get('ping')
    async ping() {
        return {
            message: 'Pong',
            status: HttpStatus.OK
        };
    }

    @Get('db')
    async checkDatabase() {
        // Aquí podrías agregar lógica para verificar la conexión a la base de datos, por ejemplo
        // si tienes un servicio de base de datos con un método `checkConnection`.
        try {
            // Simulamos que la base de datos está conectada correctamente
            return {
                message: 'Database connection is healthy',
                status: HttpStatus.OK
            };
        } catch (error) {
            return {
                message: 'Database connection failed',
                status: HttpStatus.INTERNAL_SERVER_ERROR
            };
        }
    }

    @Get('status')
    async getSystemStatus() {
        // Aquí puedes agregar lógica para verificar el estado del sistema, carga, etc.
        return {
            system: 'healthy',
            load: 'normal',  // Aquí podrías agregar más detalles según sea necesario
            status: HttpStatus.OK
        };
    }
}
