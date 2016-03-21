class Event < ActiveRecord::Base
  has_one :event_type
  has_many :event_times
  has_many :event_teachers
  has_many :teachers, through: :event_teachers
end
