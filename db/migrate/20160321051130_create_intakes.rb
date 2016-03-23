class CreateIntakes < ActiveRecord::Migration
  def change
    create_table :intakes do |t|
      t.string :name
      t.string :color
      t.date :start_date
      t.date :finish_date
      t.date :term_one_start
      t.date :term_one_end
      t.date :term_two_start
      t.date :term_two_end
      t.date :term_three_start
      t.date :term_three_end
      t.date :term_four_start
      t.date :term_four_end

      t.timestamps null: false
    end
  end
end
