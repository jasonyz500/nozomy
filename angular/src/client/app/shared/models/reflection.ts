export class Reflection {
	_id: string;
	user_name: string;
	reflection_cutoff_date: string;
	reflection_week_number: number;
	last_edited: string;
	reflection_prompt: string;
	reflection_body: string;

	constructor(obj: any) {
		this._id = obj._id;
		this.user_name = obj.user_name;
		this.reflection_cutoff_date = obj.reflection_cutoff_date;
		this.reflection_week_number = obj.reflection_week_number;
		this.last_edited = obj.last_edited;
		this.reflection_prompt = obj.reflection_prompt;
		this.reflection_body = obj.reflection_body;
	}
}
