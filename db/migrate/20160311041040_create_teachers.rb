class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
      t.references :user, index: true, foreign_key: true
      t.string :name
      t.string :image
      t.text :bio

      t.timestamps null: false
    end
  end
end
