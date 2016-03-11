json.array!(@teachers) do |teacher|
  json.extract! teacher, :id, :user_id, :name, :image, :bio
  json.url teacher_url(teacher, format: :json)
end
