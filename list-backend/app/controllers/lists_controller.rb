class ListsController < ApplicationController

    def index
        lists = List.all
        render json: lists.to_json(
            :include => { :items => { only: [:id, :name, :status, :priority, :due_date] } },
            :only => [:id, :name]
        )
    end

end
