import Bee from 'bee-queue'
import HandleWithFileClientProcess from '../app/jobs/HandleWithFileClientProcess'
import configRedis from '../config/redis'

const jobs = [HandleWithFileClientProcess]
class Queue {
    constructor() {
        this.queues = {}
        this.init()
    }
    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: configRedis
                }),
                handle
            }
        })
    }


    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save()
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key]

            bee.process(handle)
        })
    }
}

export default new Queue()