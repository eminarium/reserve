json.array! @shifts do |shift|
    json.(
        shift, 
            :id, 
            :title, 
            :notes, 
            :created_at, 
            :updated_at
    )
end