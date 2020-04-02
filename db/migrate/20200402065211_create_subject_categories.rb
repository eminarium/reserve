class CreateSubjectCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :subject_categories do |t|
      t.string :title
      t.text :notes
      t.boolean :is_kids

      t.timestamps
    end
  end
end
