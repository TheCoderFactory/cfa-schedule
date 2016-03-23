class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.string :title
      t.string :notification
      t.string :audience
      t.string :author
      t.belongs_to :intake

      t.timestamps null: false
    end
  end
end
