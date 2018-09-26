export class TemplateTask {
	name: string
	num: number
	subtasks: number

	constructor(name: string){
		this.name = name;
		this.subtasks = 0;
		this.num = parseInt(name.replace(".", ""));// TODO alle punkte raus
	}
}
