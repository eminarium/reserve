class CreateSubjects < ActiveRecord::Migration[5.2]
  def change
    create_table :subjects do |t|
      t.string :title
      t.integer :level
      t.text :notes
      t.references :subject_category, foreign_key: true
      t.references :language, foreign_key: true

      t.timestamps
    end
  end
end
