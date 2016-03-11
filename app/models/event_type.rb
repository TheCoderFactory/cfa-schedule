# == Schema Information
#
# Table name: event_types
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  icon        :string
#  color       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class EventType < ActiveRecord::Base
  has_many :events

  validates :name, :icon, :color, presence: true
end
