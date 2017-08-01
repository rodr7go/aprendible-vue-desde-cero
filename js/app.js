Vue.component('tasks', {
	template: `<div>
		<h1>Lista de tareas</h1>
		<h4 v-if="completed">Tareas completas: {{ completed }}</h4>
		<h4 v-if="incompleted">Tareas incompletas: {{ incompleted }}</h4>
		<ul>
			<li is="task" v-for="task in tasks" :task="task"></li>
			<li class="form-inline">
				<input v-on:keyup.enter="add" v-model="newTask" type="text" class="form-control">
			</li>
		</ul>
	</div>`,
	data: function(){
		return {
			newTask: "",
			tasks: [
				{title: "Aprender PHP", completed: true},
				{title: "Aprender Laravel", completed: false},
				{title: "Aprender VueJS", completed: false}
			]
		}
	},
	methods: {
		add: function(){
			if (this.newTask.length <= 1) return alert('La tarea no puede estar vacía');

			this.tasks.push({
				title: this.newTask,
				completed: false
			});
			this.newTask = "";
		}
	},
	computed:{
		completed: function(){
			return this.tasks.filter(function(task){
				return task.completed;
			}).length;
		},
		incompleted: function(){
			return this.tasks.filter(function(task){
				return ! task.completed;
			}).length;
		}
	}
});

Vue.component('task', {
	props: ['task'],
	template: `<li>
		<span v-text="task.title"></span>
		<span @click="complete()" :class="classes"></span>
	</li>`,
	methods: {
		complete: function(){
			this.task.completed = ! this.task.completed;
		}
	},
	computed: {
		classes: function(){
			console.log('css changed');
			return ['glyphicon', this.task.completed ? 'glyphicon-check' : 'glyphicon-unchecked'];
		},
	}
});

var app = new Vue({el: '#app'});



