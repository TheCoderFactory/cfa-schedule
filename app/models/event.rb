# == Schema Information
#
# Table name: events
#
#  id            :integer          not null, primary key
#  event_type_id :integer
#  name          :string
#  description   :text
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Event < ActiveRecord::Base
  belongs_to :event_type
  belongs_to :user
  has_many :event_times
  has_many :event_intakes
  has_many :intakes, through: :event_intakes

  accepts_nested_attributes_for :event_times

  validates :event_type, :name, :description, presence: true


end
