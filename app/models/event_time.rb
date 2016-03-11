# == Schema Information
#
# Table name: event_times
#
#  id         :integer          not null, primary key
#  event_id   :integer
#  date       :date
#  start_time :time
#  end_time   :time
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class EventTime < ActiveRecord::Base
  belongs_to :event

  validates :event, :date, :start_time, :end_time, presence: true

  def self.this_week
    where("date >= ? and date <= ?", Date.today, Date.today + 7.days)
  end
end
