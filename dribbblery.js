$(function() {
	
	var Shot = Backbone.Model.extend({

	});

	var ShotsList = Backbone.Collection.extend({
		model: Shot,
		page: 1,
		per_page: 9,
		list_name: "popular",
		url: function () {
			return "http://dribbblery-api.herokuapp.com/shots/" + this.list_name + "?page=" + this.page + "&per_page=" + this.per_page;
			},
		parse: function(response) {
			this.page++;
			return response.shots;
		}
	});
	
	var PopularShots = new ShotsList;
	var DebutsShots = new ShotsList;
	DebutsShots.list_name = "debuts";
	var EveryoneShots = new ShotsList;
	EveryoneShots.list_name = "everyone";
	
	var ShotView = Backbone.View.extend({
		tagName: "div",
		className: "shot",
		template: _.template($("#shot-template").html()),
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.el.id = this.model.get('id');
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		el: $("#container"),
		
		currentList: PopularShots,
		lists: [PopularShots, DebutsShots, EveryoneShots],
		
		events: {
			"click #loadmore": "loadMore",
			"click #header li": "changeCurrentList"
		},
		initialize: function() {
			_.each(this.lists, function(list) {
				this.listenTo(list, 'add', this.addOne);
				this.listenTo(list, 'reset', this.addAll);
				this.listenTo(list, 'all', this.render);
				if (list == this.currentList) {
					list.fetch();
				} else {
					list.fetch({silent: true});
				}
			}, this);
		},
		
		render: function(el) {
			this.$("#shots").html("");
			this.currentList.each(this.addOne);
			
		},
		
		addOne: function(shot) {
			var view = new ShotView({model: shot});
			this.$("#shots").append(view.render().el);
		},
		
		addAll: function(sender) {
			if (this.currentList === sender) {
				this.render();
			}
		},
		
		loadMore: function() {
			this.currentList.fetch({update: true, remove: false});
		},
		
		changeCurrentList: function(event) {
			switch (event.target.id) {
				case "popular":
					this.currentList = PopularShots;
					break;
				case "debuts":
					this.currentList = DebutsShots;
					break;
				case "everyone":
					this.currentList = EveryoneShots;
					break;
			}
			$("#header li").removeClass('selected');
			$(event.target).addClass('selected');
			this.render();
		}
	});
			
	var app = new AppView;
});
