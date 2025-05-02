export class Instance {
	data: any;
	namespace = 'unk';

	get globalId() {
		return this.namespace + ':' + this.data.id;
	}
}
