json.array!(@events) do |event|
  json.extract! event, :id, :event_type_id, :name, :description, :stame, :description, :user_id
  json.url event_url(event, format: :json)
end
