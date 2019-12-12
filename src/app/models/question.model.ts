import { Option } from './option.model';

export class Question {
    constructor(
        public desc: string,
        public options: Option[]) { }
}
