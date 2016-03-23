class EventTeacher < ActiveRecord::Base
  belongs_to :event
  belongs_to :teacher
end
