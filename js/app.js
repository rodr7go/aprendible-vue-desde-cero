Vue.component('user', {
	props: ['name', 'lastName'],
	data: function(){
		return {
			app: {
				name: 'Aprendible'
			}
		}
	},
	template: `<div>
		<h1>Usuario de {{ app.name }}</h1>
		<h2>Nombre: {{ name }} {{ lastName }}</h2>
		<input v-model="name" />
		<input v-model="app.name" />
	</div>`
});


var app = new Vue({
	el: '#app',
	data: {
		newTask: "",
		tasks: [
			{title: "Aprender PHP", completed: true},
			{title: "Aprender Laravel", completed: false},
			{title: "Aprender VueJS", completed: false}
		]
	},
	methods: {
		addTask: function(){
			if (this.newTask.length <= 1) return alert('La tarea no puede estar vacía');

			this.tasks.push({
				title: this.newTask,
				completed: false
			});
			this.newTask = "";
		},
		completeTask: function(task){
			task.completed = ! task.completed;
		},
		taskClasses: function(task){
			console.log('css changed');
			return ['glyphicon', task.completed ? 'glyphicon-check' : 'glyphicon-unchecked'];
		}
	},
	computed: {
		completedTasks: function(){
			return this.tasks.filter(function(task){
				return task.completed;
			}).length;
		},
		incompletedTasks: function(){
			return this.tasks.filter(function(task){
				return ! task.completed;
			}).length;
		}
	}
});