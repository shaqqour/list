class ListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :items
  #has_many :items
end
