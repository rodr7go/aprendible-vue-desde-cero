Vue.component('tasks', {
	template: `<section class="todoapp">
		<header class="header">
			<h1>Tareas</h1>
			<input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo">
		</header>
		<section>
			<ul class="todo-list">
				<li class="todo" is="task" v-for="task in tasks" :task="task"></li>
			</ul>
		</section>
		<footer class="footer">
			<span class="todo-count">Completas: {{ completed }} | Incompletas: {{ incompleted }}</span>
		</footer>
	</section>`,
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
	template: `<li :class="classes">
		<div class="view">
			<input class="toggle" type="checkbox" v-model="task.completed"  />
			<label v-text="task.title"></label>
		</div>
	</li>`,
	computed: {
		classes: function(){
			return { completed: this.task.completed };
		},
	}
});

var app = new Vue({el: '#app'});
