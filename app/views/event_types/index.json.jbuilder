json.array!(@event_types) do |event_type|
  json.extract! event_type, :id, :name, :description, :icon, :color
  json.url event_type_url(event_type, format: :json)
end
