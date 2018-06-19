Vue.component('tasks', {
	template: `<section class="todoapp">
		<header class="header">
			<h1>Tareas</h1>
			<input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo" placeholder="Qué deseas hacer?">
		</header>
		<section>
			<ul class="todo-list">
				<li class="todo" is="task" v-for="task in tasks" :task="task"></li>
			</ul>
		</section>
		<footer class="footer" v-show="tasks.length">
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
			<label v-text="task.title" @dblclick="edit()"></label>
			<button class="destroy" @click="remove()"></button>
		</div>
		<input class="edit"
			v-model="task.title"
			@keyup.enter="doneEdit()"
			@blur="doneEdit()"
			@keyup.esc="cancelEdit()"
		>
	</li>`,
	data: function(){
		return {
			editing: false,
			cacheBeforeEdit: ''
		}
	},
	methods: {
		edit: function(){
			this.cacheBeforeEdit = this.task.title;
			this.editing = true;
		},
		doneEdit: function(){
			if(! this.task.title)
			{
				this.remove();
			}

			this.editing = false;
		},
		cancelEdit: function(){
			this.editing = false;
			this.task.title = this.cacheBeforeEdit;
		},
		remove: function (){
			var tasks = this.$parent.tasks;

			tasks.splice(tasks.indexOf(this.task), 1);
		}
	},
	computed: {
		classes: function(){
			return { completed: this.task.completed, editing: this.editing };
		},
	}
});

var app = new Vue({el: '#app'});
