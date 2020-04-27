class ListsController < ApplicationController

    def index
        lists = List.all
        render json: ListSerializer.new(lists)
    end

    def create
        list = List.create(name: params[:name])
        render json: ListSerializer.new(list)
    end

    def destroy
        listToDelete = List.find_by(id: params[:id])
        listToDelete.items.each { |item| item.delete }
        listToDelete.delete
        render json: listToDelete.to_json
    end

end
