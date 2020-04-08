json.array! @shifts do |shift|
    json.(
        shift, 
            :id, 
            :title, 
            :start_time,
            :end_time,
            :notes, 
            :created_at, 
            :updated_at
    )
end