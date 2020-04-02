class CreateSubjectTests < ActiveRecord::Migration[5.2]
  def change
    create_table :subject_tests do |t|
      t.references :applicant, foreign_key: true
      t.references :subject, foreign_key: true
      t.date :test_date
      t.references :season, foreign_key: true
      t.float :result
      t.text :notes

      t.timestamps
    end
  end
end
