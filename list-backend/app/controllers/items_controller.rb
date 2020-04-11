class ItemsController < ApplicationController

    def create
        list = List.find_by(id: params[:list_id])
        item = list.items.create(item_params)
        
        render json: item.to_json
    end
    
    private
    def item_params
        params.require(:item).permit(:name, :status, :priority, :due_date, :list_id)
    end

end
