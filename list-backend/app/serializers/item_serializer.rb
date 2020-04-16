class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :status, :priority, :due_date, :list_id
  #belongs_to :list
end
