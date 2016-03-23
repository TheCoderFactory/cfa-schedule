class Intake < ActiveRecord::Base
  has_many :events
  has_many :notices
  has_many :students
end
