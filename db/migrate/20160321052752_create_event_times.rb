class CreateEventTimes < ActiveRecord::Migration
  def change
    create_table :event_times do |t|
      t.date :start_date
      t.date :finish_date
      t.time :start_time
      t.time :finish_time
      t.belongs_to :event

      t.timestamps null: false
    end
  end
end
