class RemovePhotoUrlFromApplicant < ActiveRecord::Migration[5.2]
  def change
    remove_column :applicants, :photo_url
  end
end
