class ListsController < ApplicationController

    def index
        lists = List.all
        render json: ListSerializer.new(lists)
    end

    def create
        list = List.find_or_create_by(name: params[:name])
        render json: ListSerializer.new(list)
    end

end
