class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :status, :priority, :due_date
  #belongs_to :list
end
