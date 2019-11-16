class TestApiController < ApplicationController
    def test_upload
        a = Avatar.new
        a.image = params[:image]
        a.save!
        render json: { :success => "ok" }
    end
    def serve_file
        avatar = Avatar.last
        content = avatar.image.read
        if stale?(etag: content, last_modified: DateTime.new, public: true)
            send_data content, type: avatar.image.file.content_type, disposition: "inline"
            expires_in 0, public: true
        end
    end
end
