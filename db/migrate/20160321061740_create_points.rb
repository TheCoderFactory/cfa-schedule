class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.integer :amount
      t.string :reason
      t.belongs_to :teacher
      t.belongs_to :student

      t.timestamps null: false
    end
  end
end
