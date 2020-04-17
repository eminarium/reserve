class RemoveTestDateFromSubjectTests < ActiveRecord::Migration[5.2]
  def change
    remove_column :subject_tests, :test_date
  end
end
