$(function() {
	
	var Shot = Backbone.Model.extend({

	});

	var ShotsList = Backbone.Collection.extend({
		model: Shot,
		page: 1,
		per_page: 9,
		url: function () {
			return "http://dribbblery-api.herokuapp.com/shots/popular?page=" + this.page + "&per_page=" + this.per_page;
			},
		parse: function(response) {
			this.page++;
			return response.shots;
		}
	});

	var Shots = new ShotsList;
	
	var ShotView = Backbone.View.extend({
		tagName: "div",
		className: "shot",
		template: _.template($("#shot-template").html()),
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var ShotsView = Backbone.View.extend({

	});

	var AppView = Backbone.View.extend({
		el: $("#container"),
		
		initialize: function() {
			this.listenTo(Shots, 'add', this.addOne);
			this.listenTo(Shots, 'reset', this.addAll);
			this.listenTo(Shots, 'all', this.render);
			Shots.fetch();
		},
		
		render: function() {
			
		},
		
		addOne: function(shot) {
			var view = new ShotView({model: shot});
			this.$("#shots").append(view.render().el);
		},
		
		addAll: function() {
			Shots.each(this.addOne);
		}
	});
			
	var app = new AppView;
});
