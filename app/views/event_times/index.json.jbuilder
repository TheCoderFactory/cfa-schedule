json.array!(@event_times) do |event_time|
  json.extract! event_time, :id, :event_id, :date, :start_time, :end_time
  json.url event_time_url(event_time, format: :json)
end
