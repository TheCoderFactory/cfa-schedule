class CreateEventTimes < ActiveRecord::Migration
  def change
    create_table :event_times do |t|
      t.references :event, index: true, foreign_key: true
      t.date :date
      t.time :start_time
      t.time :end_time

      t.timestamps null: false
    end
  end
end
